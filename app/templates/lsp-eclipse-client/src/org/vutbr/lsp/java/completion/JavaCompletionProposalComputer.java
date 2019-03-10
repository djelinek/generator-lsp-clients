package org.vutbr.lsp.java.completion;

import java.util.Arrays;
import java.util.List;

import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.ui.text.java.ContentAssistInvocationContext;
import org.eclipse.jdt.ui.text.java.IJavaCompletionProposalComputer;
import org.eclipse.jface.text.contentassist.ICompletionProposal;
import org.eclipse.jface.text.contentassist.IContextInformation;
import org.eclipse.lsp4e.operations.completion.LSContentAssistProcessor;

@SuppressWarnings("restriction")
public class JavaCompletionProposalComputer implements IJavaCompletionProposalComputer {

	@Override
	public List<ICompletionProposal> computeCompletionProposals(ContentAssistInvocationContext context, IProgressMonitor monitor) {
		return Arrays.asList(new LSContentAssistProcessor().computeCompletionProposals(context.getViewer(), context.getInvocationOffset()));
	}

	@Override
	public List<IContextInformation> computeContextInformation(ContentAssistInvocationContext context, IProgressMonitor monitor) {
		return Arrays.asList(new LSContentAssistProcessor().computeContextInformation(context.getViewer(), context.getInvocationOffset()));
	}

	@Override
	public String getErrorMessage() {
		return null;
	}
	
	@Override
	public void sessionStarted() {
	}

	@Override
	public void sessionEnded() {
	}

}
