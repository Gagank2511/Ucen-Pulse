# UCENPulse - Personal Fitness Tracker

A modern, client-side web application designed for UCEN Manchester students to log and visualize their personal fitness and wellness data.

## 🎯 Project Overview

UCENPulse enables students to monitor daily activities, track health metrics, and explore trends over time through an interactive, responsive, and accessible interface.

## ✨ Features

### Activity Logging
- Add daily activities (running, cycling, gym, yoga, swimming, walking)
- Record duration and optional notes
- Form validation with real-time error feedback
- Character counter for notes (200 character limit)

### Health Metrics Tracking
- Track multiple metrics: steps, water intake (L), sleep hours, calories
- Metric-specific validation (e.g., steps: 0-100,000, water: 0-20L)
- Client-side storage using localStorage
- Data persistence across sessions

### Data Visualization
- Interactive charts with statistics (average, peak, total)
- Bar charts for steps and calories
- Area charts with gradients for water and sleep
- Custom tooltips and legends
- Filter by metric type
- Adjustable date range (7-90 days)

### Dashboard Overview
- Today's metrics summary with visual progress bars
- Goal tracking (10,000 steps, 2.5L water, 8hrs sleep, 2,000 calories)
- Color-coded metric cards with emojis
- Recent activities list with formatted dates

### Data Management
- Export all data as JSON file
- Clear all data with confirmation
- Real-time notifications for user actions

### Responsive Design & Accessibility
- Mobile-first responsive design
- ARIA labels and roles throughout
- Semantic HTML5 elements
- Keyboard navigation support
- Focus management with visible focus indicators
- Screen reader friendly

## 🛠️ Technologies Used

- **React 18.2.0** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **localStorage API** - Client-side data persistence
- **ES6+ JavaScript** - Modern JavaScript features

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Usage

1. **Add Activities**: Use the activity form to log your daily exercises
2. **Record Metrics**: Track your health metrics (steps, water, sleep, calories)
3. **View Dashboard**: Monitor your progress with visual indicators
4. **Analyze Trends**: Use charts to visualize patterns over time
5. **Filter Data**: Select different metrics and date ranges
6. **Export Data**: Download your data as JSON for backup

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility Features

- ARIA labels for all interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Focus visible indicators
- Screen reader announcements for dynamic content
- Color contrast compliance
- Form validation with error messages

## 🔮 Future Enhancements (Semester 2)

### Server-Side Integration Considerations
- **User Authentication**: JWT-based authentication system
- **Database Storage**: PostgreSQL/MongoDB for persistent data storage
- **RESTful API**: Endpoints for CRUD operations on activities and metrics
- **Data Security**: Encrypted data transmission (HTTPS), input sanitization
- **Multi-user Support**: User-specific data isolation
- **Cloud Backup**: Automatic data synchronization
- **Social Features**: Share achievements, compare with friends
- **Advanced Analytics**: ML-based insights and recommendations

### Planned API Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/activities
POST   /api/activities
DELETE /api/activities/:id
GET    /api/metrics
POST   /api/metrics
DELETE /api/metrics/:id
GET    /api/analytics/trends
```

## 📊 Data Structure

### Activity Object
```javascript
{
  id: number,
  date: "YYYY-MM-DD",
  type: "Running" | "Cycling" | "Gym" | "Yoga" | "Swimming" | "Walking" | "Other",
  duration: number, // minutes
  notes: string // optional, max 200 chars
}
```

### Metric Object
```javascript
{
  id: number,
  date: "YYYY-MM-DD",
  metric: "steps" | "water" | "sleep" | "calories",
  value: number
}
```

## 🧪 Testing Recommendations

- Unit tests for utility functions
- Component tests for forms and charts
- Integration tests for data flow
- Accessibility testing with screen readers
- Cross-browser compatibility testing
- Responsive design testing on multiple devices

## 📝 License

This project is created for educational purposes as part of UCEN Manchester coursework.

## 👨‍💻 Author

UCEN Manchester Student - Level 6 Project

## 🙏 Acknowledgments

- UCEN Manchester for project requirements
- React and Vite communities
- Recharts for visualization library
- Tailwind CSS for styling framework
