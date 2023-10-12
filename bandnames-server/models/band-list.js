const Band = require("./band");

class BandList{
    constructor(){
        this.bands = [
            new Band("Hillsong"),
            new Band("Inspiracion"),
            new Band("Palabra en Accion"),
            new Band("Generacion 12")
        ];
    }

    addBand( name ){
        this.bands.push( new Band(name) );
        return this.bands;
    }

    removeBand( id ){
        this.bands = this.bands.filter( band => band.id !== id);
        return this.bands;
    }

    getBands(){
        return this.bands;
    }

    increaseVotes( id ){
        this.bands = this.bands.map( band => {
            if ( band.id === id ) band.votes +=1;
            return band;
        })
    }

    changeBandName( id, newName ){
        this.bands = this.bands.map( band => {

            if ( band.id === id ) {
                band.name = newName;
            }

            return band;

        })
    }
}

module.exports = BandList;