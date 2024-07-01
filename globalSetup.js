// globalSetup.js

global.DebuggerInternal = global.DebuggerInternal || {};
global.setTimeout = global.setTimeout || setTimeout;
global.clearTimeout = global.clearTimeout || clearTimeout;
global.fetch = global.fetch || fetch;
global.Headers = global.Headers || Headers;
global.Request = global.Request || Request;
global.Response = global.Response || Response;
global.FileReader = global.FileReader || FileReader;
global.Blob = global.Blob || Blob;
global.FormData = global.FormData || FormData;
global.URLSearchParams = global.URLSearchParams || URLSearchParams;
global.AbortController = global.AbortController || AbortController;
global.XMLHttpRequest = global.XMLHttpRequest || XMLHttpRequest;
global.self = global.self || self;
global.performance = global.performance || performance;
global.navigator = global.navigator || navigator;
// global.MessageChannel = global.MessageChannel || MessageChannel;
global.requestAnimationFrame = global.requestAnimationFrame || requestAnimationFrame;
