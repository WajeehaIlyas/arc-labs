# ARC Lab Website — Makefile
# Usage: make          → install deps and start dev server
#        make install  → install dependencies only
#        make dev      → start dev server (assumes deps installed)
#        make build    → build for production
#        make preview  → preview production build locally
#        make clean    → remove node_modules and build output

.PHONY: all install dev build preview clean check-node

# Default target: install then run
all: check-node install dev

# Check that Node.js and npm are available
check-node:
	@echo "Checking dependencies..."
	@command -v node >/dev/null 2>&1 || { \
		echo ""; \
		echo "  ERROR: Node.js is not installed."; \
		echo "  Install it from https://nodejs.org (LTS version recommended)"; \
		echo "  Or on Ubuntu/Debian:  sudo apt install nodejs npm"; \
		echo ""; \
		exit 1; \
	}
	@command -v npm >/dev/null 2>&1 || { \
		echo ""; \
		echo "  ERROR: npm is not installed."; \
		echo "  It usually comes with Node.js. Try: sudo apt install npm"; \
		echo ""; \
		exit 1; \
	}
	@echo "  Node.js: $$(node -v)"
	@echo "  npm:     $$(npm -v)"
	@echo ""

# Install npm dependencies
install: check-node
	@echo "Installing dependencies..."
	@npm install
	@echo ""
	@echo "  Done. Run 'make dev' to start the development server."
	@echo ""

# Start the development server
dev:
	@echo ""
	@echo "  Starting ARC Lab dev server..."
	@echo "  Open http://localhost:5173 in your browser."
	@echo "  Press Ctrl+C to stop."
	@echo ""
	@npm run dev

# Build for production
build: check-node
	@echo "Building for production..."
	@npm run build
	@echo ""
	@echo "  Build complete. Output is in the 'dist/' folder."
	@echo ""

# Preview the production build locally
preview: build
	@echo "Starting preview server..."
	@echo "Open http://localhost:4173 in your browser."
	@echo ""
	@npm run preview

# Remove installed packages and build artifacts
clean:
	@echo "Cleaning project..."
	@rm -rf node_modules dist
	@echo "  Removed node_modules/ and dist/"
	@echo ""
