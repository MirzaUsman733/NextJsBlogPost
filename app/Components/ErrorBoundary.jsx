"use client";
import React, { useState } from "react";

function ErrorBoundary({ fallback, children }) {
  const [hasError, setHasError] = useState(false);

  function handleTryAgain() {
    setHasError(false);
  }

  function componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  if (hasError) {
    return (
      <div>
        {fallback ? (
          fallback
        ) : (
          <>
            <h2>Oops, there is an error!</h2>
            <button type="button" onClick={handleTryAgain}>
              Try again?
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onError: () => setHasError(true),
        });
      })}
    </>
  );
}

export default ErrorBoundary;
