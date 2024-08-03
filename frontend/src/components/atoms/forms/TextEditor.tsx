import ENV from '@/lib/environment'
import { Editor } from '@tinymce/tinymce-react'

import { useTheme } from '@/components/providers/ThemeProvider'

interface TextEditorProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const fontFamily = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap'

const bodyStyle = [
  { theme: 'light', style: 'body { font-family: "Quicksand", sans-serif; font-size: 14px; }' },
  {
    theme: 'dark',
    style: 'body { font-family: "Quicksand", sans-serif; color: #fff; background-color: #09090B; font-size: 14px;  }'
  }
]

export default function TextEditor({ id, value, onChange, placeholder }: TextEditorProps) {
  const { theme } = useTheme()

  const defaultInit = {
    height: 330,
    menubar: false,
    plugins: 'link lists advlist',
    placeholder: placeholder || 'Write something here...',
    toolbar: 'undo redo ' + ' | bold italic | ' + ' | link | numlist bullist',
    advlist_number_styles: 'default,lower-alpha,lower-roman,upper-alpha,upper-roman',
    content_css: [fontFamily],
    content_style:
      bodyStyle.find((style) => style.theme === theme)?.style || `body { font-family: "Quicksand", sans-serif; }`
  }

  const editorKey = `editor-${theme}`

  return (
    <Editor
      key={editorKey}
      id={id}
      init={
        theme === 'dark'
          ? {
              ...defaultInit,
              skin: 'oxide-dark',
              content_style: bodyStyle.find((style) => style.theme === theme)?.style
            }
          : defaultInit
      }
      apiKey={ENV.apiKeyTinyMce}
      value={value}
      onEditorChange={(newValue: string) => onChange(newValue)}
    />
  )
}
