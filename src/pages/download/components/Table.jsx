import React from "react";
import { downloadFiles } from "./downloadFiles";
import DownloadIcon from "./DownloadIcon";

const Table = () => {
  return (
    <div className="">
      <table className="rounded-lg">
        <thead className="bg-Blue ">
          <tr>
            <th className="p-3 text-White">Documento</th>
            <th className="p-3 text-White">Descarga</th>
          </tr>
        </thead>
        <tbody>
          {downloadFiles.map((file, index) => (
            <tr key={index} className="border border-PauBackground">
              <td className="p-2">{file.filename}</td>
              <td className="p-2 flex justify-center">
                <a href={file.url} download={file.filename}>
                  <DownloadIcon width={"30px"} height={"30px"} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
