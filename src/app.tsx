import { Card, CardBody, Textarea } from "@chakra-ui/react";
import React from "preact/compat";
import { useState } from "preact/hooks";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import 'katex/dist/katex.min.css'

export function App() {
  const [input, setInput] = useState<string>('')

  const onSetInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value
    setInput(value)
  }

  const defaultValue = `
  # Hello world!

  A paragraph with *emphasis* and **strong importance**.
  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

  * Lists
  * [ ] todo
  * [x] done

  A table:

  | a | b |
  | - | - |

  $l = r\\theta$

  $$\\frac{1}{2}$$
  $$\\frac{d}{dx}\\int_{a}^{x}f(t)dt-f(x)$$

  The lift coefficient ($C_L$) is a dimensionless coefficient.
  `

  return (
    <main className={'w-full h-screen flex flex-col md:flex-row gap-6 md:gap-0 py-10 md:py-0'}>
      <div className={`flex-1 md:${input ? 'w-1/2' : 'w-full'} px-8 md:pl-10 md:py-20`}>
        <Textarea value={input} onChange={onSetInput} resize={'none'} h={'100%'} paddingX={6} paddingY={5} />
      </div>
      {input &&
        <div className={'flex-1 md:w-1/2 px-8 md:pr-10 md:py-20'}>
          <Card h={'100%'} paddingX={2} >
            <CardBody overflow={'scroll'}>
              <Markdown
                remarkPlugins={[
                  remarkMath,
                  remarkGfm
                ]}
                rehypePlugins={[
                  rehypeKatex
                ]}
                skipHtml={false}
                className={'markdown'}
              >
                {input}
              </Markdown>
            </CardBody>
          </Card>
        </div>
      }
    </main>
  )
}
