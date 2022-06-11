const functions = require("firebase-functions");

// làm việc với file tốn bộ nhớ (300s,1Gb)
exports.convertLargeFile(object) = functions
    .runWith({
      // Ensure the function has enough memory and time
      // to process large files
      timeoutSeconds: 300,
      memory: "1GB",
    })
    .storage.object()
    .onFinalize(() => {
        object();
      // Do some complicated things that take a lot of memory and time
    });
