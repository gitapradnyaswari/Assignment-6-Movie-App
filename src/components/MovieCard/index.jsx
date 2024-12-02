import styles from "./MovieCard.module.css";

function MovieCard(props) {
  return (
    <div className={styles.card}>
      <img
        src={props.image_url}
        className={styles.movieImg}
        alt={props.title}
        onError={(event) => {
          event.target.src =
            "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RXJyb3J8ZW58MHx8MHx8fDA%3D"; // Default image jika terjadi error
        }}
      />
      <div className={styles.movieTitleContainer}>
        <h4 className={styles.ellipsis}>{props.title}</h4>
      </div>
    </div>
  );
}

export { MovieCard };