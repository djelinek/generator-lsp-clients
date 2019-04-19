'use strict';

import * as path from 'path';
import { workspace, ExtensionContext, window, StatusBarAlignment, commands, ViewColumn, TextEditor, languages } from 'vscode';
import { LanguageClient, LanguageClientOptions, Executable } from 'vscode-languageclient';

var os = require('os');
var storagePath;

const LANGUAGE_CLIENT_ID = '<%= userProps.serverID %>';
const LANGUAGE_CLIENT_NAME = '<%= userProps.bundleName %>';

export function activate(context: ExtensionContext) {
	<% if(userProps.fileType.includes('xml')) { %> 
	languages.setLanguageConfiguration('<%= userProps.fileType[0] %>', {
		wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
	});
	<% } %>
	storagePath = context.storagePath;
	if (!storagePath) {
		storagePath = getTempWorkspace();
	}

	var path = require('path');
	var camelLanguageServerPath = context.asAbsolutePath(path.join('libs', 'lsp-server.jar'));
	console.log(camelLanguageServerPath);

	let serverOptions: Executable = {
		command: '<%= userProps.runJarField[0] %>',
		args: [ '<%= userProps.runJarField[1] %>', camelLanguageServerPath],
		options: {stdio:'pipe'}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for xml
		documentSelector: [<%- userProps.documentSelectors %>],
		synchronize: {
			configurationSection: [<%- userProps.configurationSections %>],
			// Notify the server about file changes to .xml files contain in the workspace
			fileEvents: [<%- userProps.fileEvents %>
			],
		}
	};

	let item = window.createStatusBarItem(StatusBarAlignment.Right, Number.MIN_VALUE);
	item.text = 'Starting <%= userProps.bundleName %> Language Server...';
	toggleItem(window.activeTextEditor, item);
	// Create the language client and start the client.
	let languageClient = new LanguageClient(LANGUAGE_CLIENT_ID, LANGUAGE_CLIENT_NAME, serverOptions, clientOptions);
	languageClient.onReady().then(() => {
		item.text = '<%= userProps.bundleName %> Language Server started';
		toggleItem(window.activeTextEditor, item);
		commands.registerCommand('lsp.<%= userProps.bundleName %>.open.output', ()=>{
		languageClient.outputChannel.show(ViewColumn.Three);
	}, error => {console.log(error)});

	window.onDidChangeActiveTextEditor((editor) =>{
		toggleItem(editor, item);
	});
});
	let disposable = languageClient.start();
	// Push the disposable to the context's subscriptions so that the
	// client can be deactivated on extension deactivation
	context.subscriptions.push(disposable);
}

function toggleItem(editor: TextEditor, item) {
	if(editor && editor.document &&
		(<%- userProps.documentLanguageId %>)){
		item.show();
	} else{
		item.hide();
	}
}

export function parseVMargs(params:any[], vmargsLine:string) {
	if (!vmargsLine) {
		return;
	}
	let vmargs = vmargsLine.match(/(?:[^\s"]+|"[^"]*")+/g);
	if (vmargs === null) {
		return;
	}
	vmargs.forEach (arg => {
		//remove all standalone double quotes
		arg = arg.replace( /(\\)?"/g, function ($0, $1) { return ($1 ? $0 : ''); });
		//unescape all escaped double quotes
		arg = arg.replace( /(\\)"/g, '"');
		if (params.indexOf(arg) < 0) {
			params.push(arg);
		}
	});
}

function getTempWorkspace() {
	return path.resolve(os.tmpdir(),'vscodesws_'+makeRandomHexString(5));
}

function makeRandomHexString(length) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    var result = '';
    for (var i = 0; i < length; i++) {
        var idx = Math.floor(chars.length * Math.random());
        result += chars[idx];
    }
    return result;
}
