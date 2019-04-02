/*
 * Copyright (c) 2012-2018 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */
package org.eclipse.che.plugin.<%= userProps.bundleName %>.server.languageserver;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Set;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.eclipse.che.api.languageserver.DefaultInstanceProvider;
import org.eclipse.che.api.languageserver.LanguageServerConfig;
import org.eclipse.che.api.languageserver.ProcessCommunicationProvider;
import org.eclipse.che.api.project.server.impl.RootDirPathProvider;
import org.eclipse.che.plugin.<%= userProps.bundleName %>.server.inject.LSPGeneratorModule;

/** Launcher for <%= userProps.bundleName %> Language Server */
@Singleton
public class LSPGeneratorLanguageServerConfig implements LanguageServerConfig {
  private static final String REGEX = ".*\\.(<%= userProps.fileType[0] %>|<%= userProps.fileType[1] %>)$";

  private final Path launchScript;
  private final RootDirPathProvider rootDirPathProvider;

  @Inject
  public LSPGeneratorLanguageServerConfig(RootDirPathProvider rootDirPathProvider) {
    this.rootDirPathProvider = rootDirPathProvider;
    this.launchScript = Paths.get(System.getenv("HOME"), "che/ls-<%= userProps.bundleName %>/launch.sh");
  }

  @Override
  public RegexProvider getRegexpProvider() {
    return new RegexProvider() {
      @Override
      public Map<String, String> getLanguageRegexes() {
        return ImmutableMap.of(LSPGeneratorModule.LANGUAGE_ID, REGEX);
      }

      @Override
      public Set<String> getFileWatchPatterns() {
        return ImmutableSet.of();
      }
    };
  }

  @Override
  public CommunicationProvider getCommunicationProvider() {
    ProcessBuilder processBuilder = new ProcessBuilder(launchScript.toString());
    processBuilder.redirectInput(ProcessBuilder.Redirect.PIPE);
    processBuilder.redirectOutput(ProcessBuilder.Redirect.PIPE);

    return new ProcessCommunicationProvider(processBuilder, LSPGeneratorModule.LANGUAGE_ID);
  }

  @Override
  public InstanceProvider getInstanceProvider() {
    return DefaultInstanceProvider.getInstance();
  }

  @Override
  public InstallerStatusProvider getInstallerStatusProvider() {
    return new InstallerStatusProvider() {
      @Override
      public boolean isSuccessfullyInstalled() {
        return launchScript.toFile().exists();
      }

      @Override
      public String getCause() {
        return isSuccessfullyInstalled() ? null : "Launch script file does not exist";
      }
    };
  }

  @Override
  public String getProjectsRoot() {
    return rootDirPathProvider.get();
  }
}
