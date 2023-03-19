import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
 
class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-gray-800">
        <Head />
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;