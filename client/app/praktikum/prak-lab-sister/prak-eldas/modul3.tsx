const Modul_3 = () => {
    return (
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold">Modul 3: Daya, Kapasitor, Induktor</h3>
  
        <h4 className="text-md font-semibold mt-2">Tujuan:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Menghitung kebutuhan daya yang diberikan oleh sumber arus dan tegangan.</li>
          <li>Menganalisis fungsi kapasitor dan induktor serta merangkai dalam rangkaian sederhana.</li>
        </ul>
  
        <h4 className="text-md font-semibold mt-2">Dasar Teori:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li><strong>Daya Listrik:</strong> Energi yang diserap atau dihasilkan dalam sirkuit listrik. Rumus: P = V × I, P = I²R, P = V²/R.</li>
          <li><strong>Kapasitor:</strong> Komponen yang menyimpan dan melepaskan muatan listrik. Rumus: Q = C × V.</li>
          <li><strong>Induktor:</strong> Komponen yang menyimpan energi dalam bentuk medan magnet sesuai Hukum Induksi Faraday.</li>
        </ul>
  
        <h4 className="text-md font-semibold mt-2">Langkah Kerja:</h4>
        <ol className="list-decimal pl-5 text-gray-700">
          <li>Membuat rangkaian daya listrik menggunakan EasyEDA dan mengamati perubahan tegangan serta arus.</li>
          <li>Melakukan simulasi pengisian kapasitor dan mengukur perubahannya.</li>
          <li>Melakukan eksperimen dengan induktor untuk memahami sifat medan magnetnya.</li>
        </ol>
  
        <h4 className="text-md font-semibold mt-2">Kesimpulan:</h4>
        <p className="text-gray-700">
          Praktikum ini memperkenalkan konsep dasar daya listrik, serta karakteristik kapasitor dan induktor dalam rangkaian listrik.
        </p>

        {/* Link Download PDF */}
        <h4 className="text-md font-semibold mt-4">Materi Tambahan:</h4>
        <p className="text-gray-700">Unduh PDF modul ini untuk referensi lebih lanjut:</p>
        <a
          href="/Modul-3.pdf" // Pastikan file PDF ada di folder public
          download="Modul 3 Praktikum Elektronika Dasar.pdf"
          className="text-blue-600 hover:underline"
        >
          📄 Download Modul 3 (PDF)
        </a>
      </div>
    );
};

export default Modul_3;
