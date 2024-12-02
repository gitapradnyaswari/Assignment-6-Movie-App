import styles from "./Navbar.module.css";

function Navbar(props) {
  return (
    <section className={styles.navbar}>
      <h3>H8 Movies</h3>
      <div>
        <input
          type="text"
          onChange={props.onSearchChange}
        />
        <button
          onClick={props.onSearchClick}
          className={styles.searchBarBtn}
        >
          Search
        </button>
      </div>
    </section>
  );
}

export { Navbar };