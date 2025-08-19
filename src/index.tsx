import { launchNuvoImporter } from "@getnuvo/importer-vanilla-js";

launchNuvoImporter(".nuvo-container", {
  licenseKey: "Your License Key",
  settings: {
    developerMode: true,
    identifier: "product_data",
    columns: [
      {
        label: "Product ID",
        key: "product_id",
      },
      {
        label: "Article Name",
        key: "article_name",
      },
    ],
  },
  columnHooks: {
    article_name: (values) => {
      return values.map(([item, index]) => [{ value: "#NU" + item }, index]);
    },
  },
  onCancel: () => {
    console.log("onCancel");
  },
  onEntryChange: (rows, logs) => {
    return rows.map((row) => {
      return {
        data: {
          product_id: { value: row.data.product_id + " on change" },
        },
        rowIndex: row.rowIndex,
      };
    });
  },
  onEntryInit: (row, rowIndex) => {
    return { product_id: { value: row.product_id + " on init" } };
  },
  onResults: (result, errors, complete, logs, block) => {
    console.log("Result:", result);
    console.log("Error rows:", errors);
    console.log("Logs:", logs);
    complete();
  },
});

// import { NuvoImporter } from "@getnuvo/importer-react";
// import { createRoot } from "react-dom/client";

// function App() {
//   return (
//     <NuvoImporter
//       licenseKey="Your License Key"
//       settings={{
//         developerMode: true,
//         identifier: "product_data",
//         columns: [
//           {
//             label: "Product ID",
//             key: "product_id",
//           },
//           {
//             label: "Article Name",
//             key: "article_name",
//           },
//         ],
//       }}
//       onResults={(result, errors, complete, logs, block) => {
//         console.log("Result:", result);
//         console.log("Error rows:", errors);
//         console.log("Logs:", logs);
//         complete();
//       }}
//       onCancel={() => {
//         console.log("onCancel");
//       }}
//       onEntryChange={(rows, logs) => {
//         return rows.map((row) => {
//           return {
//             data: {
//               product_id: { value: row.data.product_id + " on change" },
//             },
//             rowIndex: row.rowIndex,
//           };
//         });
//       }}
//       onEntryInit={(row, rowIndex) => {
//         return { product_id: { value: row.product_id + " on init" } };
//       }}
//       columnHooks={{
//         article_name: (values) => {
//           return values.map(([item, index]) => [
//             { value: "#NU" + item },
//             index,
//           ]);
//         },
//       }}
//     />
//   );
// }

// const container = document.getElementById("main");
// const root = createRoot(container);

// root.render(<App />);
