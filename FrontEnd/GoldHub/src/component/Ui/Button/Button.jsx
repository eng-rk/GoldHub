import React from "react";


function Button({
    variant="primary",
    size="md",
    className="",
    children,
    ...props
}) {


const variants = {

    primary:
    "btn btn-warning",

    secondary:
    "btn btn-dark text-white",

    outline:
    "btn btn-outline-warning",

    ghost:
    "btn btn-link text-warning"

};


const sizes={

    sm:"btn-sm",

    md:"",

    lg:"btn-lg"

};



return (

<button

className={`
${variants[variant]}
${sizes[size]}
d-flex align-items-center justify-content-center gap-2
${className}
`}

{...props}

>

{children}

</button>

)

}


export default Button;