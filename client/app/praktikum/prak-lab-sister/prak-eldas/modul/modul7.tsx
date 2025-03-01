const Modul_7 = () => {
    return (
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold">Modul 7: Half-Adder dan Full-Adder</h3>

        <h4 className="text-md font-semibold mt-2">Tujuan:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Memahami konsep dasar Half-Adder dan Full-Adder.</li>
          <li>Menganalisis perbedaan antara Half-Adder dan Full-Adder.</li>
          <li>Merancang dan mensimulasikan rangkaian Half-Adder dan Full-Adder.</li>
          <li>Mengimplementasikan rangkaian Half-Adder dan Full-Adder menggunakan gerbang logika dasar.</li>
        </ul>

        <h4 className="text-md font-semibold mt-2">Dasar Teori:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          <li><strong>Half-Adder:</strong> Rangkaian digital yang dapat menjumlahkan dua bit biner dan menghasilkan dua output: Sum dan Carry.</li>
          <li><strong>Full-Adder:</strong> Rangkaian digital yang mampu menjumlahkan tiga bit biner (termasuk carry input) dan menghasilkan dua output: Sum dan Carry.</li>
        </ul>

        <h4 className="text-md font-semibold mt-2">Langkah Kerja:</h4>
        <ol className="list-decimal pl-5 text-gray-700">
          <li><strong>Rangkaian Half-Adder:</strong>
            <ul className="list-disc pl-5">
              <li>Gunakan EasyEDA untuk merancang sirkuit.</li>
              <li>Komponen: Gerbang XOR, Gerbang AND, Input A dan B, LED.</li>
              <li>Amati hasil keluaran Sum dan Carry berdasarkan tabel kebenaran.</li>
            </ul>
          </li>
          <li><strong>Rangkaian Full-Adder:</strong>
            <ul className="list-disc pl-5">
              <li>Gunakan EasyEDA untuk merancang sirkuit.</li>
              <li>Komponen: Dua Half-Adder, Gerbang OR, Input A, B, dan Carry-In.</li>
              <li>Amati hasil keluaran Sum dan Carry berdasarkan tabel kebenaran.</li>
            </ul>
          </li>
        </ol>

        <h4 className="text-md font-semibold mt-2">Kesimpulan:</h4>
        <p className="text-gray-700">
          Modul ini membahas konsep Half-Adder dan Full-Adder serta penerapannya dalam sistem digital.
        </p>

        {/* Link Download PDF */}
        <h4 className="text-md font-semibold mt-4">Materi Tambahan:</h4>
        <p className="text-gray-700">Unduh PDF modul ini untuk referensi lebih lanjut:</p>
        <a
          href="/Modul-7.pdf" // Pastikan file PDF ada di folder public
          download="Modul 7 Half-Adder dan Full-Adder.pdf"
          className="text-blue-600 hover:underline"
        >
          📄 Download Modul 7 (PDF)
        </a>
      </div>
    );
};

export default Modul_7;
