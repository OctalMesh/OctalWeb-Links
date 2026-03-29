package main

import (
	"os"

	"github.com/OctalMesh/Commodore/pkg/sdk"
	"github.com/OctalMesh/Commodore/pkg/version"
)

func main() {
	engine := sdk.NewCommander(sdk.Options{
		Version: version.Version,
		Binary:  "owl",
	})

	if errorValue := engine.Execute(); errorValue != nil {
		engine.Logger().Error("fleet execution failed: %v", errorValue)
		os.Exit(1)
	}
}
