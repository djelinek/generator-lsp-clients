package org.vutbr.lsp.xml.completion;

import java.util.Arrays;
import java.util.List;

import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jface.text.contentassist.ICompletionProposal;
import org.eclipse.jface.text.contentassist.IContextInformation;
import org.eclipse.lsp4e.operations.completion.LSContentAssistProcessor;
import org.eclipse.wst.sse.ui.contentassist.CompletionProposalInvocationContext;
import org.eclipse.wst.sse.ui.contentassist.ICompletionProposalComputer;

@SuppressWarnings("restriction")
public class XMLCompletionProposalComputer implements ICompletionProposalComputer {

	@Override
	public List<ICompletionProposal> computeCompletionProposals(CompletionProposalInvocationContext context, IProgressMonitor monitor) {
		return Arrays.asList(new LSContentAssistProcessor().computeCompletionProposals(context.getViewer(), context.getInvocationOffset()));
	}

	@Override
	public List<IContextInformation> computeContextInformation(CompletionProposalInvocationContext context, IProgressMonitor monitor) {
		return Arrays.asList(new LSContentAssistProcessor().computeContextInformation(context.getViewer(), context.getInvocationOffset()));
	}

	@Override
	public String getErrorMessage() {
		return null;
	}

	@Override
	public void sessionEnded() {
	}

	@Override
	public void sessionStarted() {
	}

}
