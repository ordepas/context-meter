import type { Register } from 'claude-code'

type Weather = { icon: string; color: string }
const MONO = '︎'

const SUN = '☀' + MONO
const CLOUD = '☁' + MONO
const BOLT = '⚡' + MONO

const weather = (percent: number): Weather =>
  percent >= 95 ? { icon: CLOUD + CLOUD + CLOUD + BOLT + BOLT + BOLT, color: '#ff5555' }
  : percent >= 90 ? { icon: CLOUD + CLOUD + CLOUD + BOLT + BOLT, color: '#ff5555' }
  : percent >= 80 ? { icon: CLOUD + CLOUD + BOLT, color: '#eab308' }
  : percent >= 70 ? { icon: CLOUD + CLOUD, color: '#4b4b4b' }
  : percent >= 50 ? { icon: CLOUD, color: '#a3a3a3' }
  : { icon: SUN, color: '#4ade80' }

export const register: Register = on => {
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const { context } = await $.session.usage()
    const cwd = await $.session.cwd()
    const percent = context.percent ?? 0
    const hasUsage = context.tokens !== undefined

    const { Box, Text } = $.ui.resolve(e)
    const { icon, color } = weather(percent)

    return (
      <Box width={e.props.bodyColumns} justifyContent="space-between">
        <Box flexShrink={0}>
          <Text color={color}>{icon}</Text>
          {hasUsage && (
            <Text dimColor>
              {' '}
              {percent.toFixed(0)}% de {Math.round(context.window / 1000)}k · {new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          )}
        </Box>
        <Text dimColor wrap="truncate-start">{cwd}</Text>
      </Box>
    )
  })
}
