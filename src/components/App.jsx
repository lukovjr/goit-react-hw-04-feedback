import { Component } from 'react';
import { Section } from "./Section";
import { FeedbackOptions } from "./FeedbackOptions";
import { Statistics } from "./Statistics";
import { Container } from './App.styled';
import { Notification } from './Notification';


export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  }

  onLeaveFeedback  = (name) => {
      this.setState(prev => {
        return { [name]: prev[name] + 1 };
      });
  };

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    return (good + neutral + bad);
  };

  countPositiveFeedbackPercentage(total) {
    return (
      total > 0 ? Math.round((this.state.good * 100) / total) : 0
    );
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage(total);
  
    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions options={Object.keys(this.state)} onLeaveFeedback={this.onLeaveFeedback }/>
        </Section>
        <Section title="Statistics">
          {total > 0 ?
            <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage} />
            : <Notification message='There is no feedback' />
          }
          
        </Section>
      </Container>
  );
  }
};