import React, { useMemo } from 'react';
import { useAuth } from "../../../store/auth"; // Make sure this path is correct
import './SimpleAnalytics.css'; 

// A simple, reusable component for the percentage bars
const StatBar = ({ percentage, color }) => {
  return (
    <div className="stat-bar-background rounded-5">
      <div 
        className="stat-bar-foreground rounded-5" 
        style={{ width: `${percentage}%`, backgroundColor: color }}
      >
      </div>
    </div>
  );
};

function SimpleAnalytics() {
  const { allAdminsComplaints } = useAuth();

  const stats = useMemo(() => {
    const statistics = {
      total: allAdminsComplaints?.length || 0,
      categories: {
        Infrastructure: 0,
        Faculty: 0,
        Services: 0,
        Student: 0,
        Hostel: 0,
        Other: 0,
      },
      statuses: {
        Pending: 0,
        Progress: 0,
        Resolved: 0,
        Rejected: 0,
      }
    };

    if (statistics.total === 0) {
      return statistics; 
    }

    for (const complaint of allAdminsComplaints) {
      if (complaint.category && statistics.categories.hasOwnProperty(complaint.category)) {
        statistics.categories[complaint.category]++;
      }
      if (complaint.status && statistics.statuses.hasOwnProperty(complaint.status)) {
        statistics.statuses[complaint.status]++; // <<< This will now count "Progress"
      }
    }

    return statistics;
  }, [allAdminsComplaints]);

  const getPercentage = (count, total) => {
    if (total === 0) return 0;
    return (count / total * 100).toFixed(1); // 1 decimal place
  };

  const categoryColors = {
    Infrastructure: '#2b66c7ff',
    Faculty: '#0a8852ff',
    Services: '#f5900bff',
    Student: '#c42a2aff',
    Hostel: '#8b5cf6',
    Other: '#6b7280',
  };

  const statusColors = {
    Pending: '#f98817ff',  // Amber
    Progress: '#154eabff', // Blue 
    Resolved: '#0b8a40ff', // Green
    Rejected: '#d32222ff', // Red
  };

  return (
    <section className="container-fluid simple-analytics-section p-0">
      <h3 className="mb-4 fw-light text-start mx-3" style={{color:"#065064"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bar-chart-line-fill me-2" viewBox="0 0 16 16">
          <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1z"/>
        </svg>
        Complaints Analysis</h3>
      
      {stats.total === 0 ? (
        <p className="text-muted">No complaints filed yet.</p>
      ) : (
        <div className="row">
          {/* Column 1: Categories */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="stat-card p-4 rounded-4 bg-white">
              <h5 className="stat-card-title mb-4 pb-2">By Category</h5>
              {Object.entries(stats.categories).map(([name, count]) => {
                const percentage = getPercentage(count, stats.total);
                return (
                  <div className="stat-item mb-3" key={name}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="stat-name">{name}</span>
                      <span className="stat-value">{count} Complaints ({percentage}%)</span>
                    </div>
                    <StatBar percentage={percentage} color={categoryColors[name]} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Statuses */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="stat-card p-4 rounded-4 bg-white">
              <h5 className="stat-card-title mb-4 pb-2">By Status</h5>
              {Object.entries(stats.statuses).map(([name, count]) => {
                const percentage = getPercentage(count, stats.total);
                return (
                  <div className="stat-item mb-3" key={name}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="stat-name">{name}</span>
                      <span className="stat-value">{count} Complaints ({percentage}%)</span>
                    </div>
                    <StatBar percentage={percentage} color={statusColors[name]} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SimpleAnalytics;