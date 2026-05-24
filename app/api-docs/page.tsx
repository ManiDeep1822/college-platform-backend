"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocsPage() {
  return <SwaggerUI url="http://localhost:3000/api/docs" />;
}
