import styles from "./Task.module.css";

const Task = () => {
  return (
    <>
      <div className={styles.text_wrapper}>
        <h1 className={styles.h1}>Uzdevums MD16</h1>
        <br />
        <span>
          Chat GPT it jāpaprasa masīvs ar Filmām (vismaz 6 keys), kur ir vismaz
          10 ieraksti un jāieliek json-server DB.
        </span>

        <strong>Prasības:</strong>
        <span>Applikācja ir trīs sadaļas:</span>
        <ul>
          <li>Par projektu - info par mājasdarbu</li>
          <li>Filmu saraksts - saraksts ar filmām</li>
          <li>Par autoru - info par autoru</li>
        </ul>

        <p>
          Filmas ir jāvar izdzēst, un kad tas tiek izdarīt visas filmas tiek
          paprasītas no DB pa jaunu (invalidate query).
        </p>

        <p>
          Katrai filmai ir arī savs atvēruma skats, kurā atšķirībā no list skata
          rādās arī komentāri un Komentārus ir jāvar arī pievienot. Ja filma
          netika atrasta, ir jāsūta uz 404 lapu. Filmas kartiņa ir atsevišķs
          komponents.
        </p>

        <p>
          Visiem react-query hookiem ir jābūt savos izolētos failos, kā mēs to
          darijām nodarbībā.
        </p>

        <strong>
          <p>Jāizmanto:</p>
        </strong>
        <ul>
          <li>React router</li>
          <li>React Query</li>
          <li>React</li>
          <li>CSS modules. </li>
        </ul>
        <p>
          <strong>Bonuss:</strong> Applikācijā ir iespējams nomainīt valodu, kur
          teksti, kas nenāk no DB tulkojās. Pievienojot komentārus datus validē
          ar zod Jāizmanto zod react-i18next
        </p>
      </div>
    </>
  );
};

export default Task;
