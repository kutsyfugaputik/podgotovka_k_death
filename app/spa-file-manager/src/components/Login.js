import React, { useEffect, useState } from "react";
import { getFiles, uploadFile, deleteFile } from "../api/files";

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await getFiles(token);
      setFiles(response.data);
    } catch (error) {
      console.error("Ошибка при получении файлов:", error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    try {
      await uploadFile(token, selectedFile);
      fetchFiles();
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      await deleteFile(token, fileId);
      fetchFiles();
    } catch (error) {
      console.error("Ошибка при удалении файла:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Мои файлы</h1>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        style={styles.fileInput}
      />
      <button onClick={handleFileUpload} style={styles.button}>
        Загрузить
      </button>

      <ul style={styles.fileList}>
        {files.map((file) => (
          <li key={file.id} style={styles.fileItem}>
            <span>{file.name}</span>
            <button onClick={() => handleFileDelete(file.id)} style={styles.deleteButton}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  fileInput: {
    marginBottom: "16px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  fileList: {
    marginTop: "20px",
    listStyleType: "none",
    padding: "0",
  },
  fileItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  deleteButton: {
    padding: "8px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
