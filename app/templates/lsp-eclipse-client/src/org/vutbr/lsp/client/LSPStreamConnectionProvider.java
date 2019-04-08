package org.vutbr.lsp.client;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.runtime.Status;
import org.eclipse.lsp4e.server.ProcessStreamConnectionProvider;

public class LSPStreamConnectionProvider extends ProcessStreamConnectionProvider {

	private static final String LSP_SERVER_NAME = "lsp-server.jar";
	private static final String LSP_SERVER_ROOT = "/libs";
	private static final String LSP_SERVER_ERR_MSG = "Cannot found the LSP Server '.jar' file!";

	public LSPStreamConnectionProvider() {
		super(computeCommands(), getWorkingDir());
	}

	private static String getWorkingDir() {
		return System.getProperty("user.dir");
	}

	private static List<String> computeCommands() {
		List<String> commands = new ArrayList<>();
		commands.add("<%= userProps.runJarField[0] %>");
		commands.add("<%= userProps.runJarField[1] %>");
		commands.add(getLanguageServerJarPath());
		return commands;
	}

	private static String getLanguageServerJarPath() {
		String jarPath = "";
		URL fileURL = Platform.getBundle(Activator.PLUGIN_ID).getEntry(LSP_SERVER_ROOT + "/" + LSP_SERVER_NAME);
		try {
		   URL resolvedFileURL = FileLocator.toFileURL(fileURL);
		   URI resolvedURI = new URI(resolvedFileURL.getProtocol(), resolvedFileURL.getPath(), null);
		   File file = new File(resolvedURI);
		   if (Platform.OS_WIN32.equals(Platform.getOS())) {
				jarPath = "\"" + file.getAbsolutePath() + "\"";
			} else {
				jarPath = file.getAbsolutePath();
			}
		} catch (URISyntaxException | IOException exception) {
			Activator.getInstance().getLog().log(
					new Status(IStatus.ERROR, Activator.PLUGIN_ID, LSP_SERVER_ERR_MSG, exception));
		}
		return jarPath;
	}
}
