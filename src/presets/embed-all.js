import {
	highlight,
	basicAudio,
	emoji,
	github,
	basicImage,
	map,
	noEmbed,
	url,
	basicVideo,
	youtube,
	facebook,
	twitter,
} from '../plugins/index'
import extend from 'just-extend'

export default function (options) {
	const defaultOptions = {
		exclude: []
	}

	const presetOptions = extend({}, defaultOptions, options)

	const pluginNames = [
		url,
		emoji,
		basicAudio,
		basicVideo,
		github,
		basicImage,
		map,
		noEmbed,
		youtube,
		facebook,
		twitter,
		highlight
	]
	const plugins = pluginNames.map(plugin => {
		if (presetOptions.exclude.indexOf(plugin.id) === -1) {
			if (plugin.id === 'youtube' || plugin.id === 'map') {
				return plugin(
					extend({}, {
							gAuthKey: options.gAuthKey
						}, presetOptions[plugin.id]
					)
				)
			}
			if (plugin.id === 'noEmbed') {
				return plugin(extend({}, presetOptions[plugin.id], {
					exclude: ['youtube']
				}))
			}
			return plugin(presetOptions[plugin.id])
		}
		return null
	})

	return plugins.filter(plugin => !!plugin)
}
