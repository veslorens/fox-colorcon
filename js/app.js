// TODO: RGBA to Hex formula...

// Main

function convert(me){
    var color;
    var color_type = $(me).attr('color-type');

    switch(color_type){
        case 'hex':
            color = $(me).val();
            color = purifyHex(color);
            color = hexToRgb(color);
            $('#rgb').val(color);
            break;

        case 'rgb':
            color = $(me).val();
            color = purifyRGB(color);
            color = color===null ? '':rgbToHex(color.r, color.g, color.b);
            $('#hex').val(color);
            break;
    }

    color = color === null ? '#FFFFFF' : color;
    color = $(me).val() === "" ? '#057582' : color;
    $('html').css({'background-color': color});
}

// Purifiers

function purifyHex(hex){
    if(hex.length == 7 && hasHashPrefix(hex)){
        hex = hex.substr(-6);
    }
    return hex;
}

function purifyRGB(rgb){

    // If the first 4 characters are "rgb("
    if(rgb.substr(0, 4) === 'rgb('){
        var colors;

        // @TODO: Remove spaces
        // removeSpaces(rgb);

        // Get characters between the parenthesis
        colors = rgb.slice(rgb.indexOf('(')+1, rgb.indexOf(')'));

        // Explode the values to array
        rgb = colors.split(',');

        if(
            isNaN(rgb[0]) || rgb[0]=="" ||
            isNaN(rgb[1]) || rgb[1]=="" ||
            isNaN(rgb[2]) || rgb[2]==""
        ){
            rgb = null;
        } else {
            var red   = parseInt(rgb[0]);
            var green = parseInt(rgb[1]);
            var blue  = parseInt(rgb[2]);

            rgb = {
                r: red,
                g: green,
                b: blue
            };
        }
    } else {
        rgb = null;
    }

    return rgb;
}

// Converters

function hexToRgb(hex){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b){
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? formatToRGB(result) : null;

    //return result ? {
    //    r: parseInt(result[1], 16),
    //    g: parseInt(result[2], 16),
    //    b: parseInt(result[3], 16)
    //} : null;
}

function rgbToHex(r, g, b){
    var result = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return formatToHex(result);
}


// Helpers

function cl(data){
    console.log(data);
}

function formatToHex(result){
    return '#' + result;
}

function formatToRGB(result){
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return 'rgb('+r+', '+g+', '+b+')';
}

function hasHashPrefix(hex){
    return hex.charAt(0) == '#';
}

function randomize(min, max){
    return min + Math.floor(Math.random() * (max - min + 1 ));
}

function randomizeColor(){
    var r = randomize(1, 255);
    var g = randomize(1, 255);
    var b = randomize(1, 255);

    var rgb = 'rgb('+r+', '+g+', '+b+')';

    $('#rgb').empty().val(rgb);

    convert($('#rgb'));
}
