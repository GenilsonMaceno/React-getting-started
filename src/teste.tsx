import './teste.css'

function Teste(){
    return (
        <>
        <section>
            <p>teste realizado com sucesso!</p>
            <MyButton/>
        </section>
        </>
    )
}

function MyButton(){

    return (
        <button className="color">click me</button>
    );
}

export default Teste