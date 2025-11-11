#!/bin/bash

echo "=== Testing Rrootshell Staff Augmentation System ==="
echo ""

# Test 1: Check dependencies
echo "✓ Test 1: Checking if dependencies are installed..."
if [ -d "node_modules" ] && [ -d "client/node_modules" ]; then
    echo "  ✓ Dependencies installed"
else
    echo "  ✗ Dependencies missing"
    exit 1
fi

# Test 2: Check database seeding
echo ""
echo "✓ Test 2: Re-seeding database..."
npm run seed > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "  ✓ Database seeded successfully"
else
    echo "  ✗ Database seeding failed"
    exit 1
fi

# Test 3: Check if server starts
echo ""
echo "✓ Test 3: Testing server startup..."
timeout 5 npm start > /tmp/server-test.log 2>&1 &
sleep 3
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "  ✓ Server started successfully"
    pkill -f "node server/index.js"
else
    echo "  ✗ Server startup failed"
    cat /tmp/server-test.log
    exit 1
fi

# Test 4: Check frontend build
echo ""
echo "✓ Test 4: Testing frontend build..."
cd client && npm run build > /tmp/build-test.log 2>&1
if [ $? -eq 0 ] && [ -d "dist" ]; then
    echo "  ✓ Frontend built successfully"
    cd ..
else
    echo "  ✗ Frontend build failed"
    cat /tmp/build-test.log
    exit 1
fi

# Test 5: Check documentation
echo ""
echo "✓ Test 5: Checking documentation..."
if [ -f "README.md" ] && [ -f "DEPLOYMENT.md" ] && [ -f "QUICKSTART.md" ]; then
    echo "  ✓ All documentation files present"
else
    echo "  ✗ Documentation missing"
    exit 1
fi

echo ""
echo "=== All Tests Passed! ==="
echo ""
echo "Application is ready to use!"
echo "Quick start: npm run dev (backend) & npm run client (frontend)"
