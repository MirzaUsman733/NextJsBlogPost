export default function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <>
      <footer style={{ backgroundColor: "#FFF", marginTop: 0 }}>
        <p className="text-center  p-2 mb-0">
          &copy; Copy Right {year}. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
