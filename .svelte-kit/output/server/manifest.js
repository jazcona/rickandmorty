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
		client: {start:"_app/immutable/entry/start.BIwbR_Hw.js",app:"_app/immutable/entry/app.DEcapf5V.js",imports:["_app/immutable/entry/start.BIwbR_Hw.js","_app/immutable/chunks/DKgrL3HQ.js","_app/immutable/chunks/DQC2JIAu.js","_app/immutable/chunks/BKtBK3MY.js","_app/immutable/entry/app.DEcapf5V.js","_app/immutable/chunks/DQC2JIAu.js","_app/immutable/chunks/wbTAq3b_.js","_app/immutable/chunks/BfTWVDdd.js","_app/immutable/chunks/BKtBK3MY.js","_app/immutable/chunks/CFcGtLKM.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
