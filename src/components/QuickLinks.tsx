import { Globe, Github, FolderOpen, Terminal, Copy, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useState } from 'react';

interface QuickLinksProps {
  prodUrl?: string;
  githubUrl?: string;
  localPath?: string;
  itermProfile?: string;
}

export function QuickLinks({ prodUrl, githubUrl, localPath, itermProfile }: QuickLinksProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const links = [
    {
      icon: Globe,
      label: 'Production',
      value: prodUrl,
      action: prodUrl ? () => window.open(prodUrl, '_blank') : undefined,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: githubUrl,
      action: githubUrl ? () => window.open(githubUrl, '_blank') : undefined,
    },
    {
      icon: Terminal,
      label: 'iTerm',
      value: itermProfile ? `iterm ${itermProfile}` : undefined,
      action: itermProfile ? () => copyToClipboard(`iterm ${itermProfile}`, 'iTerm') : undefined,
      copyable: true,
    },
    {
      icon: FolderOpen,
      label: 'Folder',
      value: localPath,
      action: localPath ? () => copyToClipboard(localPath, 'Folder') : undefined,
      copyable: true,
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {links.map((link, index) => {
          const Icon = link.icon;
          const isDisabled = !link.value;

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button
                  onClick={link.action}
                  disabled={isDisabled}
                  className={`p-2 rounded transition-colors ${
                    isDisabled
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              {link.value && (
                <TooltipContent>
                  <div className="text-xs">
                    <div className="mb-0.5 flex items-center gap-1">
                      {link.label}
                      {copied === link.label && <span className="text-green-400">(Copied!)</span>}
                    </div>
                    <code className="text-gray-400">{link.value}</code>
                    {link.copyable && <div className="text-gray-500 mt-1">Click to copy</div>}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
