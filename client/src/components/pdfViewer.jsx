import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import resume from "../assets/resume.pdf";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const pdfViewer = () => {
  return <Document file={resume} />;
};

export default pdfViewer;
