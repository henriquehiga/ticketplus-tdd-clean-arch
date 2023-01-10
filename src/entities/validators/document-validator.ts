export const valid = (documento: string): boolean => {
  if (!charLength(documento)) {
    return false;
  }
  if (!verifyDocumentType(documento)) {
    return false;
  }
  return true;
};

function charLength(documento: string) {
  if (documento.length > 15) {
    return false;
  }
  if (documento.length < 9) {
    return false;
  }
  return true;
}

function verifyDocumentType(documento: string) {
  if (!documento.split("/")[0].includes("RG" || "CPF")) {
    return false;
  }
  return true;
}
