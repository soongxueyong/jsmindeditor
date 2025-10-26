(function ($w) {
    'use strict';
    const $d = $w.document;
    // 本地资源路径配置（根据实际文件存放位置调整）
    const LOCAL_ASSETS = {
        // jsmind 样式文件
        JSMIND_STYLE_SHEET: '/js/lib/jsmind/style/jsmind.css',
        // jsmind 核心脚本
        JSMIND_JS: '/js/lib/jsmind/es6/jsmind.js',
        JSMIND_DRAGGABLE_NODE: '/js/lib/jsmind/es6/jsmind.draggable-node.js',
        JSMIND_SCREENSHOT: '/js/lib/jsmind/es6/jsmind.screenshot.js',
        // 依赖库
        DOM_TO_IMAGE: '/js/lib/dom-to-image.min.js',
        // 项目本地脚本
        JSMIND_API: '/js/jsmind-api.js',
        JSMIND_ONLINE: '/js/jsmind-online.js'
    };

    // 加载样式文件
    function loadStyle(url, onload, onerror) {
        let link = $d.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        if (onload) link.onload = onload;
        if (onerror) link.onerror = onerror;
        $d.head.appendChild(link);
    }

    // 加载脚本文件（返回Promise）
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            let script = $d.createElement('script');
            script.type = 'text/javascript';
            script.async = false;
            script.src = src;
            script.onload = () => resolve(src);
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            $d.head.appendChild(script);
        });
    }

    // 按顺序加载所有资源
    (function () {
        // 先加载样式
        loadStyle(LOCAL_ASSETS.JSMIND_STYLE_SHEET, () => {
            // 样式加载完成后加载脚本
            loadScript(LOCAL_ASSETS.JSMIND_JS)
                .then(() => loadScript(LOCAL_ASSETS.JSMIND_DRAGGABLE_NODE))
                .then(() => loadScript(LOCAL_ASSETS.DOM_TO_IMAGE))
                .then(() => loadScript(LOCAL_ASSETS.JSMIND_SCREENSHOT))
                .then(() => loadScript(LOCAL_ASSETS.JSMIND_API))
                .then(() => loadScript(LOCAL_ASSETS.JSMIND_ONLINE))
                .catch(err => console.error('资源加载失败:', err));
        }, (err) => {
            console.error('样式文件加载失败:', err);
        });
    })();
})(window);