import React, { useRef } from 'react';
import Reveal from '../UI/Reveal';
import Card, { PointsList } from '../UI/Card';
import PremiumCardMotion from '../UI/PremiumCardMotion';
import { ScrollHeading, ScrollSectionBlobs } from '../UI/ScrollSectionEffects';
import ActionLink from '../UI/ActionLink';
import { TEAM_DATA as team } from '../../data/team';
import './Team.css';

export default function Team() {
  const sectionRef = useRef(null);
  return (
    <section ref={sectionRef} id="team" className="team-section" aria-label="Our Leadership Team">
      <ScrollSectionBlobs targetRef={sectionRef} />
      <div className="container">
        
        {/* Section Header */}
        <ScrollHeading className="text-center max-w-720 mx-auto mb-5 pb-lg-2">
          <span className="section-tag">LEADERSHIP & CRAFT</span>
          <Reveal tag="h2" className="section-title">
            The minds shaping our engineering standard.
          </Reveal>
          <p className="section-subtitle mx-auto">
            A collaborative collective of architects, systems engineers, and designers
            obsessed with technical elegance and measurable client impact.
          </p>
        </ScrollHeading>

        {/* Profile Cards Grid */}
        <div className="row g-4">
          {team.map((member, index) => (
            <div key={member.name} className="col-12 col-sm-6 col-lg-3">
              <PremiumCardMotion index={index} columns={4}>
              <Card as="article" className="team-card" variant="team" index={0} stagger={0} scrollDriven>
                {/* Visual Avatar / Portrait Banner */}
                <div
                  className="team-avatar-banner"
                  style={{ background: member.gradient }}
                >
                  {member.image && (
                    <img className="team-avatar-image" src={member.image} alt={member.name} width={member.imageWidth} height={member.imageHeight} loading="lazy" decoding="async" />
                  )}
                  {!member.image && (
                    <div
                      className="avatar-glow"
                      style={{ backgroundColor: member.accent }}
                      aria-hidden="true"
                    />
                  )}
                  {!member.image && <div className="avatar-monogram">{member.initials}</div>}
                  
                  {/* Floating role badge */}
                  <span className="team-role-tag">{member.role}</span>
                </div>

                {/* Team Info */}
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <PointsList items={member.points} className="point-list team-points" />
                  <ActionLink to={`/team/${member.id}`} className="team-profile-link" variant="outline">
                    View Profile
                  </ActionLink>

                  {/* Social links */}
                  {Object.values(member.socials || {}).some((url) => url && url !== '#') && (
                    <div className="team-socials">
                      {member.socials?.linkedin && member.socials.linkedin !== '#' && (
                        <a href={member.socials.linkedin} className="social-icon-btn" aria-label={`${member.name} on LinkedIn`}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0-.02-3.3 1.65 1.65 0 0 0 .02 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                          </svg>
                        </a>
                      )}
                      {member.socials?.twitter && member.socials.twitter !== '#' && (
                        <a href={member.socials.twitter} className="social-icon-btn" aria-label={`${member.name} on X`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}
                      {member.socials?.github && member.socials.github !== '#' && (
                        <a href={member.socials.github} className="social-icon-btn" aria-label={`${member.name} on GitHub`}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Card>
              </PremiumCardMotion>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
