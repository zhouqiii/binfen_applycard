// 判断当前操作系统及app版本
export const APPSYS = () => {
    let s;
    let u = navigator.userAgent;
    let v = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        s = "Android";
    } else if (isIOS) {
        s = "IOS";
    } else {
        s = "Android";
    }
    return {
        v,
        s
    }
}

/**判空方法*/
export const notNull = obj => {
    if (obj === null) {
        return false;
    } else if (obj === undefined) {
        return false;
    } else if (obj === "undefined") {
        return false;
    } else if (obj === "") {
        return false;
    } else if (obj === "[]") {
        return false;
    } else if (obj === "{}") {
        return false;
    } else if (obj === {}) {
        return false;
    } else if (obj === []) {
        return false;
    } else {
        return true;
    }
};

// 从url截取参数
export const getParamsFromUrl = (arg = "") => {
    let url = window.location.href;
    if (url.indexOf("?") <= 0) {
        return;
    }
    let paramsString = url.split("?")[1];
    if (paramsString) {
        let paramsObj = {};
        if (paramsString.indexOf('&amp;') > 0) {
            paramsString = paramsString.indexOf("#/") > -1 ? paramsString.replace(/#\//g, "&amp;") : paramsString;
            paramsString.split("&amp;").forEach(function (item, index) {
                paramsObj[item.split("=")[0]] = item.split("=")[1]
            });
        } else {
            paramsString = paramsString.indexOf("#/") > -1 ? paramsString.replace(/#\//g, "&") : paramsString;
            paramsString.split("&").forEach(function (item, index) {
                paramsObj[item.split("=")[0]] = item.split("=")[1]
            });
        }
        if (arg && paramsObj[arg]) {
            return paramsObj[arg]
        } else {
            console.log("查询的参数不存在")
            return ""
        }
    } else {
        return
    }
}
// 与缤纷生活的交互方法jsBridge
function setupWebViewJavascriptBridge(callback) {
	if(window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener(
			'WebViewJavascriptBridgeReady',
			function() {
				callback(WebViewJavascriptBridge);
			},
			false
		);
	}
	if(window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe);
	}, 0);
}

export const callAppMethod = obj => {
    let { callName = "", parameters = {}, callback = () => { } } = obj;
	if(!callName) {
		return
	} else {
		setupWebViewJavascriptBridge(function(bridge) {
			bridge.callHandler(callName, parameters, callback)
		})
	}
}
