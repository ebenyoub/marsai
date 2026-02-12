import mockFilms from "@/mock/films"
import CardVideo from "./CardVideo"

function VideoSection() {
    return (
        <section className="container mx-auto my-6 flex flex-wrap justify-center gap-6">
            {
                mockFilms.map(film => <CardVideo key={film.id} film={film} />)
            }
        </section>
    )
}

export default VideoSection