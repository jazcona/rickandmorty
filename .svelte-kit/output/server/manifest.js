export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.BIozSnkN.js",app:"_app/immutable/entry/app.DG7xNGDP.js",imports:["_app/immutable/entry/start.BIozSnkN.js","_app/immutable/chunks/DmSyC3uB.js","_app/immutable/chunks/wEQNk92e.js","_app/immutable/chunks/C_dvIEoE.js","_app/immutable/entry/app.DG7xNGDP.js","_app/immutable/chunks/wEQNk92e.js","_app/immutable/chunks/BIxSByTi.js","_app/immutable/chunks/BAwGpLIb.js","_app/immutable/chunks/C_dvIEoE.js","_app/immutable/chunks/CJoBKGq9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
