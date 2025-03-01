const Modul_5 = () => {
    return (
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold">Modul 5: Konfigurasi Transistor dan Diode Resistor Logic</h3>

        <h4 className="text-md font-semibold mt-2">Tujuan:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Menganalisis berbagai konfigurasi transistor (Common Base, Common Emitter, dan Common Collector).</li>
          <li>Merancang dan memahami konsep Diode Resistor Logic (DRL) sebagai gerbang logika dasar.</li>
        </ul>

        <h4 className="text-md font-semibold mt-2">Dasar Teori:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li><strong>Common Base (CB):</strong> Impedansi input rendah, penguatan tegangan tinggi, cocok untuk frekuensi tinggi.</li>
          <li><strong>Common Collector (CC):</strong> Impedansi input tinggi, penguatan arus tinggi, sering digunakan sebagai buffer.</li>
          <li><strong>Common Emitter (CE):</strong> Penguatan tegangan dan arus tinggi, banyak digunakan dalam amplifier.</li>
          <li><strong>Diode Resistor Logic (DRL):</strong> Logika gerbang sederhana menggunakan dioda dan resistor.</li>
          <li><strong>Gerbang Logika DRL:</strong> Hanya dapat membentuk gerbang dasar seperti AND dan OR.</li>
        </ul>

        <h4 className="text-md font-semibold mt-2">Langkah Kerja:</h4>
        <ol className="list-decimal pl-5 text-gray-700">
          <li>Merancang dan menjalankan simulasi rangkaian konfigurasi CB, CC, dan CE menggunakan EasyEDA.</li>
          <li>Menganalisis karakteristik arus dan tegangan pada setiap konfigurasi.</li>
          <li>Mendesain gerbang logika sederhana menggunakan dioda dan resistor.</li>
          <li>Mengamati bagaimana perubahan input mempengaruhi output rangkaian logika.</li>
        </ol>

        <h4 className="text-md font-semibold mt-2">Kesimpulan:</h4>
        <p className="text-gray-700">
          Modul ini menjelaskan perbedaan konfigurasi transistor dalam penguatan sinyal serta prinsip dasar logika digital menggunakan dioda dan resistor.
        </p>

        {/* Link Download PDF */}
        <h4 className="text-md font-semibold mt-4">Materi Tambahan:</h4>
        <p className="text-gray-700">Unduh PDF modul ini untuk referensi lebih lanjut:</p>
        <a
          href="/Modul-5.pdf" // Pastikan file PDF ada di folder public
          download="Modul 5 Konfigurasi Transistor dan Diode Resistor Logic.pdf"
          className="text-blue-600 hover:underline"
        >
          📄 Download Modul 5 (PDF)
        </a>
      </div>
    );
};

export default Modul_5;
