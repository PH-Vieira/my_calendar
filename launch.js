{
    "type": "node",
        "request": "launch",
            "name": "Debug Main Process",
                "program": "${workspaceFolder}/node_modules/electron/dist/electron.js",
                    "args": ["."],
                        "runtimeArgs": ["--inspect=5858"]
}
