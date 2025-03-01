const Modul_4 = () => {
    return (
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold">Modul 4: Karakteristik Dioda dan Transistor</h3>

        <h4 className="text-md font-semibold mt-2">Tujuan:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Menganalisis karakteristik dioda dalam kondisi bias maju dan bias mundur.</li>
          <li>Mengamati perilaku transistor sebagai saklar dan penguat arus.</li>
          <li>Mempelajari konfigurasi rangkaian dasar yang menggunakan dioda dan transistor.</li>
        </ul>

        <h4 className="text-md font-semibold mt-2">Dasar Teori:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li><strong>Dioda:</strong> Komponen semikonduktor yang memungkinkan arus mengalir dalam satu arah.</li>
          <li><strong>Bias Maju:</strong> Arus mengalir saat tegangan maju diberikan.</li>
          <li><strong>Bias Mundur:</strong> Arus hampir tidak mengalir kecuali dalam kondisi breakdown.</li>
          <li><strong>Transistor:</strong> Komponen dengan tiga terminal yang berfungsi sebagai saklar atau penguat.</li>
          <li><strong>Mode Saklar:</strong> Operasi dalam kondisi saturasi dan cutoff.</li>
          <li><strong>Mode Penguat:</strong> Transistor bekerja dengan perbandingan arus basis dan kolektor.</li>
        </ul>

        <h4 className="text-md font-semibold mt-2">Langkah Kerja:</h4>
        <ol className="list-decimal pl-5 text-gray-700">
          <li>Mengukur karakteristik arus-tegangan (I-V) dioda dalam bias maju dan bias mundur.</li>
          <li>Menganalisis hubungan antara arus basis, kolektor, dan emitor pada transistor.</li>
          <li>Melakukan simulasi rangkaian dioda dan transistor menggunakan EasyEDA.</li>
        </ol>

        <h4 className="text-md font-semibold mt-2">Kesimpulan:</h4>
        <p className="text-gray-700">
          Praktikum ini memberikan pemahaman mendalam tentang karakteristik dioda dan transistor, serta penerapannya dalam rangkaian elektronik.
        </p>

        {/* Link Download PDF */}
        <h4 className="text-md font-semibold mt-4">Materi Tambahan:</h4>
        <p className="text-gray-700">Unduh PDF modul ini untuk referensi lebih lanjut:</p>
        <a
          href="/Modul-4.pdf" // Pastikan file PDF ada di folder public
          download="Modul 4 Karakteristik Dioda dan Transistor.pdf"
          className="text-blue-600 hover:underline"
        >
          📄 Download Modul 4 (PDF)
        </a>
      </div>
    );
};

export default Modul_4;
