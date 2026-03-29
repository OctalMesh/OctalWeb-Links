// Package version holds the build-time version for owl.
// Override at link time:
//
//	go build -ldflags="-X github.com/OctalMesh/OctalWeb-Links/cli/pkg/version.Version=1.0.0" .
package version

// Version is the SemVer string for this binary. Defaults to "dev".
var Version = "dev"
