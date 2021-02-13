"use strict";

import { app, protocol, BrowserWindow, ipcMain, Menu } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import {
	createProtocol,
	installVueDevtools,
} from "vue-cli-plugin-electron-builder/lib";

import uid from "uid";
import fs from "fs";
import util from "util";
import os from "os";
import Firebird from "node-firebird";

const readfile = util.promisify(fs.readFile);
const fromEntries = require("fromentries");
const pathExists = util.promisify(fs.exists);

var options = {};

options.host = "127.0.0.1";
options.port = 30500;
options.database = "/fdb/wyp_aut.fdb";
options.user = "SYSDBA";
options.password = "masterkey";
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null; // default
options.pageSize = 4096;
try {
	const isDevelopment = process.env.NODE_ENV !== "production";
	if (isDevelopment) {
		// Don't load any native (external) modules until the following line is run:
		require("module").globalPaths.push(process.env.NODE_MODULES_PATH);
	}

	// global reference to mainWindow (necessary to prevent window from being garbage collected)
	let mainWindow;

	// Standard scheme must be registered before the app is ready
	protocol.registerStandardSchemes(["app"], {
		secure: true,
	});

	const windowParams = {
		width: 1000,
		height: 700,
		minWidth: 800,
		minHeight: 600,
	};

	function createMainWindow() {
		const window = new BrowserWindow(windowParams);

		const menu = Menu.buildFromTemplate([
			{
				label: "WypGUI",
				submenu: [
					{
						label: "Configuration",
						click() {
							window.webContents.send(
								"config-error",
								"change config"
							);
						},
					},
					{
						role: "quit",
					},
				],
			},
			{
				label: "Edit",
				submenu: [
					{
						role: "undo",
					},
					{
						role: "redo",
					},
					{
						type: "separator",
					},
					{
						role: "cut",
					},
					{
						role: "copy",
					},
					{
						role: "paste",
					},
					[
						{
							role: "delete",
						},
						{
							type: "separator",
						},
						{
							role: "selectAll",
						},
					],
				],
			},
		]);
		Menu.setApplicationMenu(menu);

		if (isDevelopment) {
			// Load the url of the dev server if in development mode
			window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
			if (!process.env.IS_TEST) window.webContents.openDevTools();
		} else {
			createProtocol("app");
			//   Load the index.html when not in development
			window.loadURL(
				formatUrl({
					pathname: path.join(__dirname, "index.html"),
					protocol: "file",
					slashes: true,
				})
			);
			window.loadURL("https://vuejs.org/v2/guide/transitions.html");
		}

		window.on("closed", () => {
			mainWindow = null;
		});

		window.webContents.on("devtools-opened", () => {
			window.focus();
			setImmediate(() => {
				window.focus();
			});
		});

		return window;
	}

	// quit application when all windows are closed
	app.on("window-all-closed", () => {
		// on macOS it is common for applications to stay open until the user explicitly quits
		if (process.platform !== "darwin") {
			app.quit();
		}
	});

	app.on("activate", () => {
		// on macOS it is common to re-create a window even after all windows have been closed
		if (mainWindow === null) {
			mainWindow = createMainWindow();
		}
	});

	// create main BrowserWindow when electron is ready
	app.on("ready", async () => {
		if (isDevelopment && !process.env.IS_TEST) {
			// Install Vue Devtools
			await installVueDevtools();
		}
		mainWindow = createMainWindow();
	});

	ipcMain.on("klienci", async (event) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;

			// db = DATABASE
			db.query(
				"SELECT * FROM KLIENCI k INNER JOIN ADRESY a ON a.KL_ID = k.KL_ID",
				function(err, result) {
					event.sender.send("klienci", result);
					db.detach();
				}
			);
		});
	});
	ipcMain.on("auta", (event) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;

			// db = DATABASE
			db.query(
				"SELECT * FROM AUTA a INNER JOIN ROZMIESZCZENIE r ON a.AU_ID = r.AU_ID",
				function(err, result) {
					event.sender.send("auta", result);
					db.detach();
				}
			);
		});
	});

	ipcMain.on("wyszukaj_auta", async (event, data) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;
			db.query(
				`SELECT * FROM AUTA INNER JOIN ROZMIESZCZENIE r ON AUTA.AU_ID = r.AU_ID WHERE AUTA.AU_MARKA LIKE '${
					data.marka
				}%' AND AUTA.AU_MODEL LIKE '%${data.model}%'`,
				function(err, result) {
					console.log(result);
					event.sender.send("wyszukaj_auta", result);

					db.detach();
				}
			);
		});
	});

	ipcMain.on("wyszukaj_klient", async (event, data) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;
			db.query(
				`SELECT * FROM KLIENCI WHERE KLIENCI.KL_IMIE LIKE '%${
					data.imie
				}%' AND KLIENCI.KL_NAZWISKO LIKE '%${data.nazwisko}%'`,
				function(err, result) {
					console.log(result);
					event.sender.send("wyszukaj_klient", result);

					db.detach();
				}
			);
		});
	});

	ipcMain.on("dodaj_klienta", (event, data) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;
			db.execute(
				`EXECUTE PROCEDURE UTWORZ_KLIENT('${data.imie}','${
					data.nazwisko
				}','${data.pesel}','${data.tel}','${data.nip}', '${
					data.ulica
				}','${data.nr_domu}','${data.kod_pocztowy}','${
					data.miejscowosc
				}')`,
				function(err, result) {
					db.detach();
				}
			);
		});
	});

	ipcMain.on("wypozyczenia", (event, data) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;

			const nazwisko = data.nazwisko ? data.nazwisko : "";

			db.query(
				`SELECT * FROM WYPOZYCZENIA w INNER JOIN KLIENCI k ON k.KL_ID = w.KL_ID INNER JOIN AUTA a ON a.AU_ID = w.AU_ID WHERE k.KL_NAZWISKO LIKE '%${nazwisko}%' AND w.WY_DATA_ZW is NULL`,
				function(err, result) {
					event.sender.send("wypozyczenia", result);

					db.detach();
				}
			);
		});
	});

	ipcMain.on("placowki", (event, data) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;
			db.query(
				`SELECT * FROM PLACOWKI p INNER JOIN ADRESY a ON a.PL_NAZWA = p.PL_NAZWA`,
				function(err, result) {
					event.sender.send("placowki", result);

					db.detach();
				}
			);
		});
	});

	ipcMain.on("wypozycz", (event, data) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;
			db.execute(
				`EXECUTE PROCEDURE WYPOZYCZ(${data.klient_id}, '${
					data.auto_id
				}', '${data.data_wyp}')`,
				function(err, result) {
					event.sender.send("zwrot");
					db.detach();
				}
			);
		});
	});

	ipcMain.on("zwrot", (event, data) => {
		Firebird.attach(options, function(err, db) {
			if (err) throw err;
			db.execute(
				`EXECUTE PROCEDURE ZWROT(${data.auto_id}, '${
					data.pl_nazwa
				}', '${data.data_zwrotu}')`,
				function(err, result) {
					event.sender.send("zwrot");
					db.detach();
				}
			);
		});
	});
} catch (err) {
	console.log(err);
}
