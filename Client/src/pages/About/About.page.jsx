import { Button } from "@mui/material";
import React from "react";
import Footer from "../../components/Footer/Footer.component";
import Navbar from "../../ui/Menu/Navbar/Navbar.component";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import styles from "./About.module.scss";

function About() {
    return (
        <div className={styles["about"]}>
            <Navbar
                style={{ padding: "0 200px" }}
                openSidebar={() => {}}
                isShownSidebarIcon={false}
            ></Navbar>
            <div className="">
                <div
                    class={
                        styles["about_header"] +
                        " text-center bg-light d-flex default-bg"
                    }
                >
                    <div class="mx-auto w-50">
                        <h1 class="mb-1">Product Management</h1>
                        <p class="lead font-weight-normal mb-4">
                            Tracking and manage members during the project.
                        </p>
                        <Button variant="contained" color="error">
                            Learn More
                        </Button>
                    </div>
                    <svg
                        className={styles["about_header_art"]}
                        viewBox="0 0 5120.2823 783.981"
                    >
                        <path d="M 3670.6043,209.14801 C 3337.6013,212.45223 3194.3342,96.609127 2881.1672,97.148137 2460.1603,97.873147 2207.0439,206.07082 1888.1669,209.14801 1526.117,212.64183 1299.0011,21.613727 710.167,19.147727 253.12399,17.233737 0.16694596,209.14801 0.16694596,209.14801 V 783.81429 H 5120.1153 V 186.11842 C 5119.0036,185.47889 4805.6453,5.3746871 4480.5297,0.25855706 4155.4141,-4.8575729 3988.4742,205.99394 3670.6043,209.14801 Z" />
                    </svg>
                </div>
                <div className={styles["about_container"] + " container p-3"}>
                    <h2 className="text-center">About Us</h2>
                    <p className="text-center light-text mb-5">
                        We built and developed the app during years.
                    </p>
                    <div className="row">
                        <div className="col-xl-6">
                            <p>We are trusted by our customers</p>
                            <p className="d-flex align-items-center">
                                <CheckCircleOutlineOutlinedIcon className="mr-2" />{" "}
                                Thousands of access every day.
                            </p>
                            <p className="d-flex align-items-center">
                                <CheckCircleOutlineOutlinedIcon className="mr-2" />
                                Help user can manage and track easily project.
                            </p>
                            <p className="d-flex align-items-center">
                                <CheckCircleOutlineOutlinedIcon className="mr-2" />
                                Improve performance works in the project.
                            </p>
                        </div>
                        <div className="col-xl-6">
                            <p>
                                We constantly improve and enhance product
                                quality to ensure the best and most satisfaction
                                to our customers.
                            </p>
                            <Button variant="outlined">Learn More</Button>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <hr className="featurette-divider" />
                    <div
                        className={
                            styles["about_container"] +
                            " row mb-2 about_container"
                        }
                    >
                        <div className="col-md-6">
                            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                                <div className="card-body d-flex flex-column align-items-start">
                                    <strong className="d-inline-block mb-2 text-primary">
                                        Task
                                    </strong>
                                    <h3 className="mb-0">
                                        <a className="text-dark" href="#">
                                            Featured task
                                        </a>
                                    </h3>
                                    <div className="mb-1 text-muted">
                                        Mar 10
                                    </div>
                                    <p className="card-text mb-auto">
                                        Tracking project and assign tasks for
                                        members in the project.
                                    </p>
                                    <a href="#">Continue reading</a>
                                </div>
                                <img
                                    className="card-img-right flex-auto d-none d-md-block w-100"
                                    data-src="holder.js/200x250?theme=thumb"
                                    src="/assets/images/about_task.jpg"
                                    alt="Card image cap"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                                <div className="card-body d-flex flex-column align-items-start">
                                    <strong className="d-inline-block mb-2 text-success">
                                        History
                                    </strong>
                                    <h3 className="mb-0">
                                        <a className="text-dark" href="#">
                                            Detail History
                                        </a>
                                    </h3>
                                    <div className="mb-1 text-muted">
                                        July 11
                                    </div>
                                    <p className="card-text mb-auto">
                                        Include works and save calendar of
                                        members in the project.
                                    </p>
                                    <a href="#">Continue reading</a>
                                </div>
                                <img
                                    className="card-img-right flex-auto d-none d-md-block w-100"
                                    data-src="holder.js/200x250?theme=thumb"
                                    alt="Card image cap"
                                    src="/assets/images/about_history.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <hr className="featurette-divider" />
                    <div
                        className={
                            styles["about_container"] +
                            " row featurette about_container"
                        }
                    >
                        <div className="col-md-7">
                            <h2 className="featurette-heading">
                                Task Management
                                <span className="text-muted ml-2">
                                    for the project.
                                </span>
                            </h2>
                            <p className="lead">
                                Assign tasks for members and tracking project.
                                Manage members easily and simply, know the
                                current progress in the project and history
                                works.
                            </p>
                        </div>
                        <div className="col-md-5">
                            <img
                                style={{
                                    borderRadius: "5px",
                                    height: "400px",
                                    // boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.5",
                                }}
                                className="featurette-image img-fluid mx-auto w-100"
                                data-src="holder.js/500x500/auto"
                                src="/assets/images/about_task-management.jpg"
                                alt="Generic placeholder image"
                            />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <hr className="featurette-divider" />
                    <div className={styles["about_container"] + " row"}>
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading">
                                Resource Management
                                <span className="text-muted ml-2">
                                    for yourself.
                                </span>
                            </h2>
                            <p className="lead">
                                We support well and fast for problems about your
                                resources. Ensure you can manage your project
                                easily
                            </p>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <img
                                style={{
                                    borderRadius: "5px",
                                    height: "400px",
                                    // boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.5",
                                }}
                                className="featurette-image img-fluid mx-auto w-100"
                                data-src="holder.js/500x500/auto"
                                alt="Generic placeholder image"
                                src="/assets/images/about_resource.jpg"
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <hr className="featurette-divider" />
                </div>
                <main role="main" className="container py-5">
                    <div className="row">
                        <div className="col-md-8 blog-main">
                            <div className="blog-post">
                                <h2 className="blog-post-title">Information</h2>
                                <p className="blog-post-meta">
                                    January 1, 2014 by <a href="#">Mark</a>
                                </p>
                                <p>
                                    The system will help users manage projects
                                    in a simpler and easier way. It helps in
                                    managing members, monitoring them and
                                    assigning tasks at each stage in a project.
                                </p>
                                <hr />
                                <p>
                                    At the same time, the system helps users to
                                    notify all project members about the latest
                                    work. .
                                </p>
                            </div>
                            {/* /.blog-post */}
                            <div className="blog-post">
                                <h2 className="blog-post-title">New feature</h2>
                                <p className="blog-post-meta light-text">
                                    March 15, 2022
                                </p>
                                <p>
                                    We always receive comments from our
                                    customers to improve more features for the
                                    product.
                                </p>
                                <ul>
                                    <li>Support customer everytime.</li>
                                    <li>
                                        Updated frequently from customer's
                                        comments.
                                    </li>
                                    <li>Innovate and keep up with trends .</li>
                                </ul>
                                <p>
                                    We always find the best solutions for our
                                    systems, ensuring efficiency to bring the
                                    best experiences to customers. .
                                </p>
                                <p>
                                    We're looking to help the process go well,
                                    too. .
                                </p>
                            </div>
                        </div>
                        {/* /.blog-main */}
                        <aside className="col-md-4 blog-sidebar">
                            <div className="p-3">
                                <h4 className="font-italic">Version</h4>
                                <ol className="list-unstyled mb-0">
                                    <li>
                                        <a href="#">March 2014</a>
                                    </li>
                                    <li>
                                        <a href="#">February 2014</a>
                                    </li>
                                    <li>
                                        <a href="#">October 2013</a>
                                    </li>
                                    <li>
                                        <a href="#">September 2013</a>
                                    </li>
                                    <li>
                                        <a href="#">August 2013</a>
                                    </li>
                                    <li>
                                        <a href="#">July 2013</a>
                                    </li>
                                    <li>
                                        <a href="#">June 2013</a>
                                    </li>
                                    <li>
                                        <a href="#">May 2013</a>
                                    </li>
                                    <li>
                                        <a href="#">April 2013</a>
                                    </li>
                                </ol>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default About;
