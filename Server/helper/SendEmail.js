const mailer_config = require('../config/mailer.config');
const nodemailer = require('nodemailer');

const LectureMail = (user) => {
    return {
        from: mailer_config.CMS_USERNAME, // sender address
        to: user.email, // list of receivers
        subject: `SPMS - Cung cấp mật khẩu`, // Subject line
        html: `
            Chào bạn,
            <p>Chúng tôi là hệ thống SPMS từ Trường Đại học Duy Tân. Cung cấp tài khoản đăng nhập đến bạn: </p>
            <span><nobr>+ Email: <h4>${user.email}</h4></nobr></span>
            <span><nobr>+ Password: <h4>${user.password}</h4></nobr><span>
            <br>
            <strong>Yêu cầu bắt buộc sau khi đăng nhập lần đầu tiên vào hệ thống</strong>
            <ul>
                <li>Cập nhật đầy đủ thông tin</li>
                <li>Thay đổi mật khẩu</li>
            </ul>
            <p><strong>Truy cập hệ thông: </strong> <a href="http://localhost:5000"> Link truy cập hệ thống. </a> </p>
            <br />
            <p>Cảm ơn bạn vì đã sử dụng hệ thống. Chúc bạn sức khỏe!</p>
            `, // html body
    }
}


const studentEmail = (user) => {
    console.log("Đã gửi mail");
    return {
        from: mailer_config.CMS_USERNAME, // sender address
        to: user.email, // list of receivers
        subject: `SPMS - Cung Cấp Mật Khẩu`, // Subject line
        html: `
            Chào ${user.firstName},
            <p>Chúng tôi là hệ thống SPMS từ Trường Đại học Duy Tân. Cung cấp tài khoản đăng nhập đến bạn: </p>
            <span><nobr>+ Email: <h4>${user.email}</h4></nobr></span>
            <span><nobr>+ Password: <h4>${user.password}</h4></nobr><span>
            <br>
            <strong>Yêu cầu bắt buộc sau khi đăng nhập lần đầu tiên vào hệ thống</strong>
            <ul>
                <li>Cập nhật đầy đủ thông tin</li>
                <li>Thay đổi mật khẩu</li>
            </ul>
            <p><strong>Truy cập hệ thông: </strong> <a href="http://localhost:5000"/> .</p>
            <br />
            <p>Cảm ơn bạn vì đã sử dụng hệ thống. Chúc bạn sức khỏe!</p>
            `, // html body
    }
}

const sendEmailUser = async (user, objectNeedSend) => {
    let transporter = nodemailer.createTransport({
        host: mailer_config.MAILER_HOST,
        port: mailer_config.MAILER_PORT,
        secure: mailer_config.MAILER_SECURE, // true for 465, false for other ports
        auth: {
            user: mailer_config.CMS_USERNAME, // generated ethereal user
            pass: mailer_config.CMS_PASSWORD, // generated ethereal password
        },
    });

    let info = await transporter.sendMail(
        objectNeedSend(user)
    )
        .then(data => data)
        .catch(err => err);
    return info.messageId;
}

module.exports = {sendEmailUser, LectureMail, studentEmail};
