interface IEmailFormat {
  children: string
  btnText?: string
  btnLink?: string
}

export const emailFormat = ({ children, btnText, btnLink }: IEmailFormat) => {
  const isHadButton = btnText && btnLink

  return `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Quicksand, Inter, sans-serif; font-size: 16px; color: #333">
    <img src="https://i.ibb.co.com/VJGBg80/email-banner.webp" alt="banner-email" style="width: 100%; height: auto; margin-bottom: 20px;"/>
    ${children}
    ${
      isHadButton
        ? `
        <br/>
          <a href="${btnLink}" style="background-color: #18181b; outline: none; border-radius: 6px; padding: 13px 16px;color: #fff; border: 0; cursor: pointer; text-decoration: none; display:block; width: fit-content;margin: 0 auto;">
            ${btnText}
        </a>`
        : ''
    }
        <br/>
      </div>
  `
}
