import React from "react";
import { Field, Form, Formik } from "formik";
import { TimeEvent } from "../../types/TimeEvent";

interface FormValues {
    event_date: string;
    start: string;
    end: string;
    description: string;
}

const initialValues: FormValues = {
    event_date: "",
    start: "",
    end: "",
    description: ""
};

const TimeEventCard: React.FC = () => {

    const postEvent = async (event: TimeEvent) => {
        await fetch('/api/timeevents/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        })
        .then(response => { console.log(response.status); })
        .catch(err => { console.log(err); });
    }

    return (
        <div id="time-event-card" className="card flex flex-col items-center">
            <Formik initialValues={initialValues} onSubmit={async (values, actions) => {
                console.log(values);
                const event: TimeEvent = {
                    owner: window.sessionStorage.getItem('user')!,
                    date: new Date(values.event_date),
                    start: values.start,
                    end: values.end,
                    description: values.description
                }
                await postEvent(event);
                actions.setSubmitting(false);
                actions.resetForm();
            }}>
                {({ isSubmitting }) => (
                    <>
                        <h2 className="font-bold p-2">Create New Time Event</h2>
                        <Form className="flex flex-col items-center justify-center mx-auto my-auto w-fit">
                            <label id="form-elt" htmlFor="event_date">Date</label>
                            <Field id="event_date" name="event_date" type="date"/>
                            <label id="form-elt" htmlFor="start">Start Time</label>
                            <Field id="start" name="start" type="time"/>
                            <label id="form-elt" htmlFor="end">End Time</label>
                            <Field id="end" name="end" type="time"/>
                            <label id="form-elt" htmlFor="description">Description</label>
                            <Field id="description" name="description" type="text" placeholder="Description"/>
                            <button className="border-2 w-auto p-1 rounded-md m-2 font-semibold" type="submit">Create</button>
                            {isSubmitting ? (<div className="animate-pulse font-semibold text-lg">Loading...</div>) : null}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
}

export default TimeEventCard;