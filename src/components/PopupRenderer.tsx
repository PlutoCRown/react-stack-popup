import { useStackRouter } from '../hooks/useStackRouter'
import { StackRouter } from '../store/StackRouter'
interface PopupRendererProps<ID extends string, T extends any[], W = any> {
  stackRouter: StackRouter<ID, T, W>
}

export function PopupRenderer<ID extends string, T extends any[], W = any>({
  stackRouter
}: PopupRendererProps<ID, T, W>) {
  const stack = useStackRouter(stackRouter)

  return (
    <>
      {stack.map((item, index) => {
        const popupConfig = item.popupConfig as PopupConfig<ID, T, W> | undefined
        if (!popupConfig) return null

        const content = popupConfig.content(...item.args)
        const wrapper = popupConfig.wrapper
        const wrapperProps = popupConfig.wrapperProps

        if (wrapper) {
          const finalWrapperProps = item.config?.wrapperProps || wrapperProps
          const onClose = () => stackRouter.close(item.id)
          return (
            <div key={`${item.id}-${index}`}>
              {wrapper(content, { ...finalWrapperProps, onClose }, ...item.args)}
            </div>
          )
        }

        return (
          <div key={`${item.id}-${index}`} style={{ position: 'fixed', zIndex: 1000 + index }}>
            {content}
          </div>
        )
      })}
    </>
  )
}