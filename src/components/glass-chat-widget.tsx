import * as React from 'react'
import { X, Sparkles, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface GlassChatWidgetProps extends React.ComponentProps<'div'> {
  isOpen: boolean
  onClose: () => void
}

export function GlassChatWidget({
  isOpen,
  onClose,
  className,
  ...props
}: GlassChatWidgetProps) {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 w-96 flex flex-col',
        'bg-surface-container-lowest/70 backdrop-blur-xl rounded-2xl shadow-ambient z-50 overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Header - No bars, minimal */}
      <div className='flex items-center justify-between px-6 pt-6 pb-2'>
        <div className='flex items-center gap-2'>
          <div className='bg-[linear-gradient(to_right,var(--color-tertiary-container),var(--color-primary))] text-white p-1 rounded-full'>
            <Sparkles className="size-4" />
          </div>
          <h3 className='font-manrope font-semibold text-sm'>
            Synthetix AI
          </h3>
        </div>
        <Button variant='ghost' size='icon' onClick={onClose} className="rounded-full h-8 w-8 hover:bg-surface-container-low">
          <X className='size-4 text-outline-variant' />
          <span className='sr-only'>Close</span>
        </Button>
      </div>

      {/* Chat Area Sandbox */}
      <div className='flex-1 h-64 overflow-y-auto px-6 py-4 flex flex-col gap-4'>
        <div className='bg-surface p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-sm'>
          Hi there! I'm Synthetix. Ready to tailor your resume?
        </div>
        <div className='bg-primary/10 text-primary-fixed p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%] text-sm'>
          Yes, I'd like to tailor my recent developer experience.
        </div>
        <div className='bg-surface p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-sm flex flex-col gap-2'>
          <p>Great! Here are a few suggestions to improve the impact:</p>
          <div className="flex gap-2 flex-wrap mt-1">
            <Button variant="outline" size="sm" className="rounded-full text-xs h-7 bg-surface-container-lowest border-outline-variant/30">Optimize phrasing</Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs h-7 bg-surface-container-lowest border-outline-variant/30">Add metrics</Button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className='p-4 pt-2'>
        <div className='relative flex items-center bg-surface-container-lowest rounded-full border border-outline-variant/30 focus-within:border-primary-container focus-within:ring-2 focus-within:ring-primary-container/20 transition-all'>
          <Input 
            className='border-0 bg-transparent h-10 px-4 focus-visible:ring-0 focus-visible:border-0 rounded-full !shadow-none !rounded-b-full !border-b-0' 
            placeholder='Ask Synthetix...' 
          />
          <Button variant='ai-action' size='icon' className='rounded-full h-8 w-8 absolute right-1'>
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
